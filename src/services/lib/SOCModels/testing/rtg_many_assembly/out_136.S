.text

#The program checks the ALU instruction in R_type

Main:
		addi    x11 , x0 , 109 
		addi    x16 , x0 , 10 
		addi    x19 , x0 , 71 
		addi    x17 , x0 , 39 
		addi    x31 , x0 , 1 
		blt     x11 , x16 , Less_r 
		bge     x11 , x16 , Bigger_r 
Less_r:
		sub     x2 , x19 , x17 
		and     x22 , x19 , x17 
		add     x22 , x22 , x2 
		srl     x22 , x22 , x31 
		addi    x20 , x0 , 19 
		bne     x22 , x20 , Fail 
Bigger_r:
		or      x2 , x19 , x17 
		xor     x22 , x19 , x17 
		add     x22 , x22 , x2 
		sra     x22 , x22 , x31 
		addi    x20 , x0 , 99 
		bne     x22 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
