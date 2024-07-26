.text

#The program finds the value of fibonacci 

Fibo:
		addi    x21 , x0 , 12 
		addi    x12 , x0 , 1 
		addi    x6 , x0 , 1 
		addi    x17 , x0 , 3 
		beq     x21 , x0 , Result0 
		beq     x21 , x6 , Result1 
Loop: 
		blt     x21 , x17 , Result 
		add     x16 , x12 , x6 
		addi    x12 , x6 , 0 
		addi    x6 , x16 , 0 
		addi    x17 , x17 , 1 
		jal     x0 , Loop 
Result0:
		addi    x16 , x0 , 0 
		addi    x25 , x0 , 0 
		bne     x16 , x25 , Fail 
Result1:
		addi    x16 , x0 , 1 
		addi    x23 , x0 , 1 
		bne     x16 , x23 , Fail 
Result:
		addi    x13 , x0 , 144 
		bne     x16 , x13 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
