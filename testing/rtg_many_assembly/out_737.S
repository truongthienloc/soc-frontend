.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 114 
		addi    x16 , x0 , 128 
		sltiu   x1 , x17 , 128 
		bltu    x17 , x16 , Less_i 
		bgeu    x17 , x16 , Bigger_i 
Less_i:
		ori     x28 , x17 , 11 
		sub     x18 , x16 , x17 
		srai    x18 , x18 , 3 
		and     x18 , x18 , x0 
		addi    x30 , x0 , 0 
		beq     x18 , x30 , Pass 
Bigger_i:
		ori     x28 , x17 , 38 
		sub     x18 , x16 , x17 
		srai    x18 , x18 , 4 
		and     x18 , x18 , x0 
		addi    x30 , x0 , 0 
		beq     x18 , x30 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
