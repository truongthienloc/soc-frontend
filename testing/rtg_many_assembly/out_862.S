.text

#The program checks the ALU instruction in R_type

Main:
		addi    x28 , x0 , 168 
		addi    x22 , x0 , 69 
		addi    x2 , x0 , 13 
		addi    x18 , x0 , 29 
		addi    x25 , x0 , 2 
		blt     x28 , x22 , Less_r 
		bge     x28 , x22 , Bigger_r 
Less_r:
		sub     x31 , x2 , x18 
		and     x11 , x2 , x18 
		add     x11 , x11 , x31 
		srl     x11 , x11 , x25 
		addi    x5 , x0 , -1 
		bne     x11 , x5 , Fail 
Bigger_r:
		or      x31 , x2 , x18 
		xor     x11 , x2 , x18 
		add     x11 , x11 , x31 
		sra     x11 , x11 , x25 
		addi    x5 , x0 , 11 
		bne     x11 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
