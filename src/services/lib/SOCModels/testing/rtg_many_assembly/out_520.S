.text

#The program checks the ALU instruction in R_type

Main:
		addi    x5 , x0 , 62 
		addi    x6 , x0 , -37 
		addi    x2 , x0 , 25 
		addi    x19 , x0 , 199 
		addi    x30 , x0 , 0 
		blt     x5 , x6 , Less_r 
		bge     x5 , x6 , Bigger_r 
Less_r:
		sub     x20 , x2 , x19 
		and     x23 , x2 , x19 
		add     x23 , x23 , x20 
		srl     x23 , x23 , x30 
		addi    x21 , x0 , -173 
		bne     x23 , x21 , Fail 
Bigger_r:
		or      x20 , x2 , x19 
		xor     x23 , x2 , x19 
		add     x23 , x23 , x20 
		sra     x23 , x23 , x30 
		addi    x21 , x0 , 445 
		bne     x23 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
