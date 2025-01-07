.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x24 , x0 , 6 
		add     x24 , x24 , x24 
Result:
		addi    x31 , x0 , 12 
		bne     x24 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
