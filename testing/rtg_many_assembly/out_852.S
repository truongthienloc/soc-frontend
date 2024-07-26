.text

#The program checks the ALU instruction in R_type

Main:
		addi    x19 , x0 , 63 
		addi    x28 , x0 , -36 
		addi    x8 , x0 , 132 
		addi    x14 , x0 , 101 
		addi    x4 , x0 , 1 
		blt     x19 , x28 , Less_r 
		bge     x19 , x28 , Bigger_r 
Less_r:
		sub     x29 , x8 , x14 
		and     x22 , x8 , x14 
		add     x22 , x22 , x29 
		srl     x22 , x22 , x4 
		addi    x27 , x0 , 17 
		bne     x22 , x27 , Fail 
Bigger_r:
		or      x29 , x8 , x14 
		xor     x22 , x8 , x14 
		add     x22 , x22 , x29 
		sra     x22 , x22 , x4 
		addi    x27 , x0 , 227 
		bne     x22 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
