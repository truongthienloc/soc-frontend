.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x16 , x0 , 198 
		add     x16 , x16 , x16 
Result:
		addi    x5 , x0 , 396 
		bne     x16 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
