.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x21 , x0 , 81 
		add     x21 , x21 , x21 
Result:
		addi    x18 , x0 , 162 
		bne     x21 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
