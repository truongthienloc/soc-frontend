.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x29 , x0 , 8 
		add     x29 , x29 , x29 
Result:
		addi    x6 , x0 , 16 
		bne     x29 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
