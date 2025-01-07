.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x15 , x0 , 58 
		add     x15 , x15 , x15 
Result:
		addi    x24 , x0 , 116 
		bne     x15 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
