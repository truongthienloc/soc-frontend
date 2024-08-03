.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x4 , x0 , 132 
		add     x4 , x4 , x4 
Result:
		addi    x21 , x0 , 264 
		bne     x4 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
