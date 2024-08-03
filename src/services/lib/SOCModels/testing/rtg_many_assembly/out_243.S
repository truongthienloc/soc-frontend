.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x16 , x0 , 139 
		add     x16 , x16 , x16 
Result:
		addi    x7 , x0 , 278 
		bne     x16 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
