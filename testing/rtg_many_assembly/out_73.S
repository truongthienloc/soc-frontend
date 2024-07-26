.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x25 , x0 , 82 
		add     x25 , x25 , x25 
Result:
		addi    x9 , x0 , 164 
		bne     x25 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
