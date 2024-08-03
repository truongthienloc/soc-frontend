.text

#The program finds the value of fibonacci 

Fibo:
		addi    x2 , x0 , 4 
		addi    x8 , x0 , 1 
		addi    x14 , x0 , 1 
		addi    x5 , x0 , 3 
		beq     x2 , x0 , Result0 
		beq     x2 , x14 , Result1 
Loop: 
		blt     x2 , x5 , Result 
		add     x19 , x8 , x14 
		addi    x8 , x14 , 0 
		addi    x14 , x19 , 0 
		addi    x5 , x5 , 1 
		jal     x0 , Loop 
Result0:
		addi    x19 , x0 , 0 
		addi    x10 , x0 , 0 
		bne     x19 , x10 , Fail 
Result1:
		addi    x19 , x0 , 1 
		addi    x17 , x0 , 1 
		bne     x19 , x17 , Fail 
Result:
		addi    x6 , x0 , 3 
		bne     x19 , x6 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
