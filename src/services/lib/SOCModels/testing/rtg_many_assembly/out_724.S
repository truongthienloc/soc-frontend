.text

#The program checks the ALU instruction in I_type

Main:
		addi    x30 , x0 , 32 
		addi    x26 , x0 , 183 
		slt     x10 , x30 , x26 
		bltu    x30 , x26 , Less_i 
		bgeu    x30 , x26 , Bigger_i 
Less_i:
		ori     x14 , x30 , 52 
		sub     x31 , x26 , x30 
		srai    x31 , x31 , 2 
		and     x31 , x31 , x0 
		addi    x28 , x0 , 0 
		beq     x31 , x28 , Pass 
Bigger_i:
		ori     x14 , x30 , 14 
		sub     x31 , x26 , x30 
		srai    x31 , x31 , 1 
		and     x31 , x31 , x0 
		addi    x28 , x0 , 0 
		beq     x31 , x28 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
