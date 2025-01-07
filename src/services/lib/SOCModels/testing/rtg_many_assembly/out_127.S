.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , 40 
		addi    x25 , x0 , 112 
		slt     x21 , x5 , x25 
		bltu    x5 , x25 , Less_i 
		bgeu    x5 , x25 , Bigger_i 
Less_i:
		ori     x2 , x5 , 134 
		sub     x31 , x25 , x5 
		srai    x31 , x31 , 1 
		and     x31 , x31 , x0 
		addi    x8 , x0 , 0 
		beq     x31 , x8 , Pass 
Bigger_i:
		ori     x2 , x5 , 90 
		sub     x31 , x25 , x5 
		srai    x31 , x31 , 0 
		and     x31 , x31 , x0 
		addi    x8 , x0 , 0 
		beq     x31 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
