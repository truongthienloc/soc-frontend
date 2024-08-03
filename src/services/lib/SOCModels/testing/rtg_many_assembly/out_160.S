.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x6 , x0 , 186 
		add     x6 , x6 , x6 
Result:
		addi    x27 , x0 , 372 
		bne     x6 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
