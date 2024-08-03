.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x13 , x0 , 84 
		add     x13 , x13 , x13 
Result:
		addi    x30 , x0 , 168 
		bne     x13 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
