.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x2 , x0 , 9 
		add     x2 , x2 , x2 
Result:
		addi    x5 , x0 , 18 
		bne     x2 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
