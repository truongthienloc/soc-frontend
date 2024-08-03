.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x13 , x0 , 110 
		add     x13 , x13 , x13 
Result:
		addi    x17 , x0 , 220 
		bne     x13 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
