.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x11 , x0 , 82 
		add     x11 , x11 , x11 
Result:
		addi    x6 , x0 , 164 
		bne     x11 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
