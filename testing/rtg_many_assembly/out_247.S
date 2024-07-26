.text

#The program checks the ALU instruction in R_type

Main:
		addi    x27 , x0 , 47 
		addi    x23 , x0 , -52 
		addi    x14 , x0 , 122 
		addi    x13 , x0 , 45 
		addi    x1 , x0 , 3 
		blt     x27 , x23 , Less_r 
		bge     x27 , x23 , Bigger_r 
Less_r:
		sub     x22 , x14 , x13 
		and     x5 , x14 , x13 
		add     x5 , x5 , x22 
		srl     x5 , x5 , x1 
		addi    x30 , x0 , 14 
		bne     x5 , x30 , Fail 
Bigger_r:
		or      x22 , x14 , x13 
		xor     x5 , x14 , x13 
		add     x5 , x5 , x22 
		sra     x5 , x5 , x1 
		addi    x30 , x0 , 26 
		bne     x5 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
