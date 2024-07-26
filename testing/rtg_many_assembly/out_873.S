.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x4 , x0 , 42 
		add     x4 , x4 , x4 
Result:
		addi    x23 , x0 , 84 
		bne     x4 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
