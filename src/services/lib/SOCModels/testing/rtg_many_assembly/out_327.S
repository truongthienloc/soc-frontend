.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x8 , x0 , 36 
		add     x8 , x8 , x8 
Result:
		addi    x14 , x0 , 72 
		bne     x8 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
