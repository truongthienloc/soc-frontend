.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x28 , x0 , 148 
		add     x28 , x28 , x28 
Result:
		addi    x18 , x0 , 296 
		bne     x28 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
